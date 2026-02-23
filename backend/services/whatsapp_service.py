from twilio.rest import Client

def send_whatsapp_reminder(phone, task_title):
    # Aapka real credentials
    account_sid = 'AC8b1b6375f1151e045d04184e9dc366e6'
    auth_token = 'beab51fb7bb02e5c749013a2776e80a0' 
    
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            from_='whatsapp:+14155238886', # Twilio Sandbox Number
            body=f"🚀 *TASK REMINDER* 🚀\n\nBhai, aapka task *'{task_title}'* ka time ho gaya hai. Chalo shuru ho jao! we create a history lets do it",
            to=f"whatsapp:{phone}"
        )
        print(f"✅ Success! Message sent to {phone}. SID: {message.sid}")
        return True
    except Exception as e:
        print(f"❌ Twilio Error: {e}")
        return False