from flask import Flask, request, jsonify
from supabase import create_client, Client
import os

# Initialize Flask app
app = Flask(__name__)

# Supabase URL and key
SUPABASE_URL = "https://tnaqrxnhrqbjqwjzencd.supabase.co"  
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYXFyeG5ocnFianF3anplbmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDg3OTQsImV4cCI6MjA0OTQ4NDc5NH0.jhx0dI9qo-MrHepPEM0Vy0p-PNXs_a8oBk3JUdq7DnI"  

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create a company
@app.route('/company', methods=['POST'])
def create_company():
    # Get form data (text) and file data (logo)
    data = request.form
    logo_file = request.files.get('logo')  # 'logo' is the field name for the file

    # Check if a logo file is uploaded
    if logo_file:
        # Store the logo in Supabase storage
        logo_url = store_logo_in_supabase(logo_file)
    else:
        logo_url = None  # If no logo file is uploaded, set it to None

    # Insert company profile into Supabase
    response = supabase.table('companies').insert({
        'name': data['name'],
        'wilaya_id': data['wilaya_id'],
        'address': data['address'],
        'contact': data['contact'],
        'operating_hours': data.get('operating_hours'),
        'social_media': data.get('social_media'),
        'description': data.get('description'),
        'logo': logo_url  # Store the logo URL in the database
    }).execute()

    return jsonify(response.data), 201

# Function to store logo in Supabase
def store_logo_in_supabase(logo_file):
    # Store the file in Supabase storage (company_logos bucket)
    bucket = supabase.storage.from_("company_logos")
    logo_path = f"logos/{logo_file.filename}"
    bucket.upload(logo_path, logo_file)
    return bucket.get_public_url(logo_path)['publicURL']

# Get a company by ID
@app.route('/company/<int:company_id>', methods=['GET'])
def get_company(company_id):
    response = supabase.table('companies').select('*').eq('company_id', company_id).execute()

    if not response.data:
        return jsonify({'error': 'Company not found'}), 404

    return jsonify(response.data[0])

# Update a company
@app.route('/company/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    data = request.form  # Get updated form data

    # Update company profile by id
    response = supabase.table('companies').update({
        'name': data['name'],
        'wilaya_id': data['wilaya_id'],
        'address': data['address'],
        'contact': data['contact'],
        'operating_hours': data.get('operating_hours'),
        'social_media': data.get('social_media'),
        'description': data.get('description'),
        # Handle logo if uploaded
        'logo': data.get('logo')  # Logo URL would be passed if not changed
    }).eq('company_id', company_id).execute()

    if not response.data:
        return jsonify({'error': 'Company not found'}), 404

    return jsonify(response.data[0])

# Delete a company by ID
@app.route('/company/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    response = supabase.table('companies').delete().eq('company_id', company_id).execute()

    if not response.data:
        return jsonify({'error': 'Company not found'}), 404

    return jsonify({'message': 'Company deleted successfully'}), 200

# Basic search: search companies by name, wilaya, or address
@app.route('/companies', methods=['GET'])
def search_companies():
    name_query = request.args.get('name')  
    wilaya_query = request.args.get('wilaya') 
    address_query = request.args.get('address')  

    query = supabase.table('companies').select('*')

    if name_query:
        query = query.ilike('name', f'%{name_query}%')  
    if wilaya_query:
        query = query.ilike('wilaya', f'%{wilaya_query}%')  
    if address_query:
        query = query.ilike('address', f'%{address_query}%')  

    response = query.execute()

    if not response.data:
        return jsonify({'error': 'No companies found'}), 404

    return jsonify(response.data), 200

if __name__ == '__main__':
    app.run(debug=True)









































