from flask import Flask, request, jsonify, send_from_directory
import os
import requests
import json

app = Flask(__name__, static_folder='.', static_url_path='')

def get_resend_credentials():
    hostname = os.environ.get('REPLIT_CONNECTORS_HOSTNAME')
    repl_identity = os.environ.get('REPL_IDENTITY')
    web_repl_renewal = os.environ.get('WEB_REPL_RENEWAL')
    
    if repl_identity:
        x_replit_token = f'repl {repl_identity}'
    elif web_repl_renewal:
        x_replit_token = f'depl {web_repl_renewal}'
    else:
        raise Exception('X_REPLIT_TOKEN not found for repl/depl')
    
    response = requests.get(
        f'https://{hostname}/api/v2/connection?include_secrets=true&connector_names=resend',
        headers={
            'Accept': 'application/json',
            'X_REPLIT_TOKEN': x_replit_token
        }
    )
    
    data = response.json()
    connection_settings = data.get('items', [None])[0]
    
    if not connection_settings or not connection_settings.get('settings', {}).get('api_key'):
        raise Exception('Resend not connected')
    
    return {
        'api_key': connection_settings['settings']['api_key'],
        'from_email': connection_settings['settings'].get('from_email', 'onboarding@resend.dev')
    }

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
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