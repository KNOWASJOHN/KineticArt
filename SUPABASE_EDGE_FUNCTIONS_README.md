# Helper Guide: Supabase Edge Functions (Sending Emails via Gmail)

This guide explains how to send invitation emails using your **personal Gmail account** via a Supabase Edge Function.

## 1. Prerequisites
You need the Supabase CLI installed on your machine.
- **Windows**: `winget install Supabase.CLI` or `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase`
- **Mac/Linux**: `brew install supabase/tap/supabase`

## 2. Initialize Supabase locally
Run these commands in your project root terminal:

```powershell
supabase init
supabase login
supabase link --project-ref your-project-id
```
*(Get `your-project-id` from your Supabase Dashboard URL: `https://supabase.com/dashboard/project/your-project-id`)*

## 3. Create the Function
Run:
```powershell
supabase functions new send-invitation
```
This creates a file at `./supabase/functions/send-invitation/index.ts`.

## 4. Write the Code (Using Gmail)

1.  **Get a Google App Password** (Required for security):
    *   Go to your [Google Account Security](https://myaccount.google.com/security).
    *   Enable **2-Step Verification** if not already on.
    *   Search for **App passwords** (or go to 2-Step Verification > App passwords).
    *   Create one named "Supabase" and copy the 16-character code.

2.  **Replace** the content of `./supabase/functions/send-invitation/index.ts` with this code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

const GMAIL_USER = Deno.env.get("GMAIL_USER");
const GMAIL_PASS = Deno.env.get("GMAIL_APP_PASSWORD");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, name } = await req.json();

    const info = await transporter.sendMail({
      from: `"Kinetic Art" <${GMAIL_USER}>`, // Shows as "Kinetic Art <your@gmail.com>"
      to: email,
      subject: "Invitation to Kinetic Art Super Computer",
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Kinetic Art Event</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border-radius:16px;border:1px solid rgba(255,255,255,0.05);box-shadow:0 0 40px rgba(180,120,255,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="padding:40px 40px 20px 40px;text-align:left;">
                            <p style="margin:0;color:#b16cff;font-size:13px;letter-spacing:1px;">KINETIC ART EVENT</p>
                            <h1 style="margin:12px 0 0 0;font-size:36px;color:#ffffff;line-height:1.2;">
                                From Circuits <br>
                                <span style="color:#b16cff;">to Compute</span>
                            </h1>
                            <p style="margin-top:10px;color:#cfcfcf;font-size:18px;">Supercomputer in Motion</p>
                        </td>
                    </tr>
                    <!-- Divider -->
                    <tr>
                        <td style="padding:0 40px;">
                            <div style="height:1px;background:linear-gradient(90deg,#7b5cff,#b16cff,#7b5cff);opacity:0.6;"></div>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding:35px 40px;color:#e6e6e6;">
                            <p style="font-size:16px;line-height:1.7;margin-top:0;">
                                Hi <b>${name}</b>, 👋
                            </p>
                            <p style="font-size:16px;line-height:1.8;">
                                Thank you for registering for the <b style="color:#b16cff;">Kinetic Art Event</b>.
                                You're now part of an experience where innovation comes alive and technology moves beyond theory into reality.
                            </p>
                            <p style="font-size:16px;line-height:1.8;">
                                Discover an interactive tech showcase where you'll explore a working miniature supercomputer,
                                understand real-world high-performance computing, and experience how massive data is processed
                                using parallel computing systems.
                            </p>
                            <!-- Info Box -->
                            <div style="margin:26px 0;padding:22px;border-radius:12px;background:#0f0f0f;border:1px solid rgba(177,108,255,0.25);">
                                <p style="margin:0;color:#dcdcdc;font-size:15px;line-height:1.8;">
                                    ⚡ Interactive Tech Showcase<br>
                                    🧠 Supercomputer in Motion<br>
                                    🖥 High-Performance Computing Concepts<br>
                                    🎮 Advanced Systems & Demonstrations
                                </p>
                            </div>
                            <p style="font-size:16px;line-height:1.8;">
                                We're excited to welcome you. Get ready to experience technology in motion and innovation in action.
                            </p>
                        </td>
                    </tr>
                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding-bottom:40px;">
                            <a href="#" style="text-decoration:none;padding:14px 40px;border-radius:30px;font-size:15px;font-weight:600;color:#ffffff;background:linear-gradient(90deg,#7b5cff,#b16cff);box-shadow:0 0 25px rgba(177,108,255,0.35);letter-spacing:0.5px;">
                                REGISTERED SUCCESSFULLY
                            </a>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background:#000000;padding:25px;text-align:center;color:#9a9a9a;font-size:13px;line-height:1.6;border-top:1px solid rgba(255,255,255,0.05);">
                            <p style="margin:0;">
                                Christ College of Engineering (Autonomous)<br>
                                Department of Computer Science & Engineering<br><br>
                                <span style="color:#b16cff;">Kinetic Art Event · Techastic 4.0</span>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `,
    });

    return new Response(JSON.stringify(info), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

## 5. Set Email Secrets & Deploy
Run these commands in your terminal to securely store your Gmail credentials and deploy the function:

```powershell
supabase secrets set GMAIL_USER=your_email@gmail.com
supabase secrets set GMAIL_APP_PASSWORD=your_16_char_app_password
supabase functions deploy send-invitation
```

## 6. Triggering the Function

### Option A: Via Database Webhook (Recommended)
This ensures an email is sent **automatically** whenever a new user registers.

1.  Go to **Supabase Dashboard** > **Database** > **Webhooks**.
2.  Click **Create a new webhook**.
3.  **Name**: `send-email-on-register`.
4.  **Table**: `participants`.
5.  **Events**: Check `INSERT`.
6.  **Type**: Select **Supabase Edge Functions**.
7.  **Edge Function**: Select `send-invitation`.
8.  **HTTP Headers**:
    *   Add `Authorization: Bearer <your-anon-key>`.
    *   *Where to find this key?* Go to **Project Settings** (gear icon) > **API** > look for `anon public`. Copy that long string.

### Option B: Via Frontend (Client-side)
You can call this function from your **Next.js app** (`registration-form.tsx`) after a successful insert:

```typescript
const { data, error } = await supabase.functions.invoke('send-invitation', {
  body: { email: formData.email, name: formData.fullName },
})
```

## 7. Managing in Dashboard
- **Monitor Logs**: Go to `Edge Functions` > `send-invitation` > `Logs` to see success/failure.
- **Manage Secrets**: Go to `Settings` > `Edge Functions` to update `GMAIL_APP_PASSWORD` if it changes.
