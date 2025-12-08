from flask import Flask, request, jsonify, send_from_directory
import os
import requests
import json

app = Flask(__name__, static_folder='.', static_url_path='')

def get_resend_credentials():
    api_key = os.environ.get('RESEND_API_KEY')
    if not api_key:
        raise Exception('RESEND_API_KEY not found in environment variables')
    
    return {
        'api_key': api_key,
        'from_email': 'onboarding@resend.dev'
    }

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/about')
def about():
    return send_from_directory('.', 'about.html')

@app.route('/work')
def work():
    return send_from_directory('.', 'work.html')

@app.route('/services')
def services():
    return send_from_directory('.', 'services.html')

@app.route('/contact')
def contact():
    return send_from_directory('.', 'contact.html')

@app.route('/blog')
def blog():
    return send_from_directory('.', 'blog.html')

@app.route('/privacy')
def privacy():
    return send_from_directory('.', 'privacy.html')

@app.route('/terms')
def terms():
    return send_from_directory('.', 'terms.html')

@app.route('/project-techflow')
def project_techflow():
    return send_from_directory('.', 'project-techflow.html')

@app.route('/project-luxury-estates')
def project_luxury_estates():
    return send_from_directory('.', 'project-luxury-estates.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact_api():
    try:
        data = request.json
        
        first_name = data.get('firstName', '')
        last_name = data.get('lastName', '')
        email = data.get('email', '')
        phone = data.get('phone', 'Not provided')
        company = data.get('company', 'Not provided')
        service = data.get('service', 'Not specified')
        budget = data.get('budget', 'Not specified')
        message = data.get('message', '')
        timeline = data.get('timeline', 'Not specified')
        newsletter = data.get('newsletter', False)
        
        if not first_name or not last_name or not email or not message:
            return jsonify({'error': 'Missing required fields'}), 400
        
        credentials = get_resend_credentials()
        
        email_html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #0a0a0a; color: #c9a962; padding: 30px; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ padding: 30px; background: #f9f9f9; }}
                .field {{ margin-bottom: 20px; }}
                .label {{ font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }}
                .value {{ margin-top: 5px; font-size: 16px; }}
                .message-box {{ background: white; padding: 20px; border-left: 4px solid #c9a962; margin-top: 10px; }}
                .footer {{ text-align: center; padding: 20px; color: #888; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name</div>
                        <div class="value">{first_name} {last_name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email</div>
                        <div class="value"><a href="mailto:{email}">{email}</a></div>
                    </div>
                    <div class="field">
                        <div class="label">Phone</div>
                        <div class="value">{phone}</div>
                    </div>
                    <div class="field">
                        <div class="label">Company / Website</div>
                        <div class="value">{company}</div>
                    </div>
                    <div class="field">
                        <div class="label">Service Interested In</div>
                        <div class="value">{service}</div>
                    </div>
                    <div class="field">
                        <div class="label">Budget Range</div>
                        <div class="value">{budget}</div>
                    </div>
                    <div class="field">
                        <div class="label">Timeline</div>
                        <div class="value">{timeline}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message</div>
                        <div class="message-box">{message}</div>
                    </div>
                    <div class="field">
                        <div class="label">Newsletter Subscription</div>
                        <div class="value">{'Yes' if newsletter else 'No'}</div>
                    </div>
                </div>
                <div class="footer">
                    This message was sent from the Elkostart contact form.
                </div>
            </div>
        </body>
        </html>
        """
        
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {credentials["api_key"]}',
                'Content-Type': 'application/json'
            },
            json={
                'from': credentials['from_email'],
                'to': ['adhamwaelelkomey@gmail.com'],
                'subject': f'New Inquiry from {first_name} {last_name} - Elkostart',
                'html': email_html,
                'reply_to': email
            }
        )
        
        if response.status_code == 200 or response.status_code == 201:
            return jsonify({'success': True, 'message': 'Email sent successfully'})
        else:
            print(f"Resend error: {response.status_code} - {response.text}")
            return jsonify({'error': 'Failed to send email'}), 500
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)