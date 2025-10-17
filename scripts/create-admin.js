// Utility script to create first admin user
// Run this in MongoDB shell or MongoDB Compass

// Replace 'admin@example.com' with the actual email of the user you want to make admin
const adminEmail = 'admin@example.com'; // CHANGE THIS

// Update user role to Admin
db.users.updateOne(
  { email: adminEmail },
  { 
    $set: { 
      role: "Admin",
      updatedAt: new Date()
    }
  }
);

// Verify the update
const updatedUser = db.users.findOne({ email: adminEmail });
print("Updated user:", JSON.stringify(updatedUser, null, 2));

if (updatedUser && updatedUser.role === "Admin") {
  print("✅ Successfully granted admin access to:", adminEmail);
} else {
  print("❌ Failed to update user role. Make sure the user exists in the database.");
  print("The user must sign up through the application first.");
}