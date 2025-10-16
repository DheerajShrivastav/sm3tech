# 🧪 Testing Admin/User System on Localhost

## Quick Setup Guide for Development Testing

### Step 1: Start Your Development Server
```bash
npm run dev
```
Your app should be running on `http://localhost:3000` or `http://localhost:3001`

### Step 2: Access the Test Page
Go to: `http://localhost:3001/test-admin`

This special test page will help you:
1. ✅ Create users in the database automatically
2. ✅ Test all API endpoints
3. ✅ Promote users to admin
4. ✅ Verify the complete flow

### Step 3: Testing Flow

#### Option A: Use the Test Page (Recommended)
1. **Sign up** at `http://localhost:3001/agency/sign-up`
2. **Go to test page**: `http://localhost:3001/test-admin`
3. **Run Step 1**: "Setup User in Database" - Creates your user with "User" role
4. **Run Step 3**: "Promote User to Admin" - Enter your email and click "Make Admin"
5. **Go to dashboard**: `http://localhost:3001/dashboard` - See admin features!

#### Option B: Manual Database Setup
1. Sign up normally through the UI
2. Use MongoDB Compass to manually change role to "Admin"
3. Connect to: `mongodb+srv://dheerajshrivastav08:...`
4. Find your user in `users` collection
5. Change `role` field from "User" to "Admin"

### Step 4: Test Admin Features

After making yourself admin, you should see:
- ✅ Admin badge in dashboard
- ✅ "Admin Panel - Role Management" section
- ✅ "Users Management" section
- ✅ Ability to promote other users

### Step 5: Create Multiple Test Users

1. Create 2-3 test accounts:
   - `testuser1@example.com`
   - `testuser2@example.com`
   - `admin@example.com`

2. Use the admin panel to change roles and test the system

### Troubleshooting

#### If users don't appear in database:
- Visit `/api/user/setup` after signing in
- This manually creates the user record

#### If admin features don't show:
- Check your role in the database
- Make sure it's exactly "Admin" (capital A)
- Refresh the page after role changes

#### If API calls fail:
- Check MongoDB connection in `.env`
- Ensure you're signed in to Clerk
- Check browser console for errors

### Quick Test Commands

Test the APIs directly:
```bash
# Check if user sync works
curl http://localhost:3001/api/user/sync -X POST

# Get all users (admin only)
curl http://localhost:3001/api/admin/users

# Promote user to admin
curl -X POST http://localhost:3001/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com", "role": "Admin"}'
```

This setup lets you test everything locally without needing webhooks or deployment!
