# Admin User Management Guide

## How to Grant Admin Access

Since admin roles are managed at the database level for security, here's how to grant admin access to users:

### Method 1: Using MongoDB Compass or MongoDB Shell

1. **Connect to your MongoDB database** using the connection string:
   ```
   mongodb+srv://dheerajshrivastav08:puD144HQ3aaJOk0j@sm3tech.dotcx.mongodb.net/?retryWrites=true&w=majority&appName=sm3tech
   ```

2. **Navigate to the `users` collection**

3. **Find the user by email** and update their role:
   ```javascript
   db.users.updateOne(
     { email: "user@example.com" },
     { $set: { role: "Admin" } }
   )
   ```

### Method 2: Using the Admin Dashboard (After you have at least one admin)

1. **Sign in as an admin user**
2. **Go to the Dashboard**
3. **Use the "Admin Panel - Role Management" section**
4. **Enter the user's email and select "Admin" role**
5. **Click "Update Role"**

### Method 3: API Endpoint (For developers)

```bash
curl -X POST http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "role": "Admin"
  }'
```

## Initial Setup Steps

### 1. Create your first admin user:

1. **Sign up normally** through the application
2. **Find your user in the database** 
3. **Manually update the role to "Admin"** using MongoDB

### 2. User Flow:

- **New users**: Automatically get "User" role
- **Admins**: Can manage other users' roles through the dashboard
- **Database**: All role changes are stored in MongoDB

### 3. Features Available:

#### For All Users:
- Access to Factory Act services
- Access to MPCB services  
- Document submission and tracking
- Basic dashboard functionality

#### For Admin Users Only:
- View all registered users
- Change user roles (Admin/User)
- Access to admin management panel
- Extended dashboard features

## Security Notes

- Admin roles are never assigned automatically
- All role changes require existing admin privileges (except initial setup)
- Webhook automatically creates user records when users sign up via Clerk
- Role verification happens on both frontend and backend

## Webhook Setup (Optional but Recommended)

To automatically sync users when they sign up:

1. **Go to Clerk Dashboard**
2. **Navigate to Webhooks**
3. **Add endpoint**: `https://yourdomain.com/api/webhooks/clerk`
4. **Subscribe to**: `user.created` and `user.updated` events
5. **Copy the webhook secret** to your `.env` file as `CLERK_WEBHOOK_SECRET`

This ensures users are automatically added to your database when they sign up through Clerk.