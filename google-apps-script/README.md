# Google Apps Script Setup Guide for Pitch Perfect

This Google Apps Script handles registrations for **Pitch Perfect 2026** alongside existing **Club** and **Committee** forms.

---

## 🛠️ Step-by-Step Setup

### Step 1: Open Your Google Sheet
1. Open the existing Google Spreadsheet connected to your VAMINT project.
2. In the top menu, click **Extensions** → **Apps Script**.

---

### Step 2: Paste the Code
1. In the Apps Script editor, open `Code.gs` (or replace the existing code).
2. Copy the entire contents of [`Code.gs`](file:///c:/Users/SANJAY/Desktop/vamint/google-apps-script/Code.gs).
3. If you use a `FORM_SECRET_KEY` in your `.env` / Vercel settings:
   - Update line 12:
     ```javascript
     var SECRET_KEY = "your_actual_form_secret_key";
     ```
   - (If you don't use a secret key or leave it blank, you can leave it as `"your_form_secret_key_here"` and it will skip the secret verification).

---

### Step 3: Sheet Tab & Automatic Headers
The script will **automatically create** the `"PitchPerfect"` tab if it doesn't already exist and format the headers in row 1:

| Column | Header | Description |
|---|---|---|
| A | Timestamp | Registration submission date & time |
| B | Team Name | Official team name |
| C | Team Size | Number of participants (1, 2, or 3) |
| D | Total Fee (₹) | Total registration fee (₹50 × team size) |
| E | P1 Name | Participant 1 Full Name |
| F | P1 Email | Participant 1 Gmail Address |
| G | P1 Phone | Participant 1 Contact (10 digits) |
| H | P1 College | Participant 1 College Name |
| I | P1 Department | Participant 1 Department |
| J | P1 Year | Participant 1 Academic Year |
| K-P | P2 Details | Participant 2 details (blank if 1-member team) |
| Q-V | P3 Details | Participant 3 details (blank if 1/2-member team) |
| W | Payment Screenshot URL | Shareable Google Drive view link to the uploaded payment screenshot |

---

### Step 4: Deploy as Web App
1. At the top right of the Apps Script editor, click **Deploy** → **Manage deployments** (or **New deployment**).
2. Choose **Web app**.
3. Set the following:
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows Next.js server on Vercel to POST data)*
4. Click **Deploy**.
5. Grant permissions if prompted (Google Drive & Google Sheets).
6. Copy the **Web App URL** (ends with `/exec`).

---

### Step 5: Environment Variables
Ensure the Web App URL is saved in your local `.env` and in **Vercel Project Settings → Environment Variables**:

```env
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
FORM_SECRET_KEY="your_form_secret_key_here"
```

Restart your local dev server or re-deploy to Vercel to apply any changes.
