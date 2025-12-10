# Agency Details Component - Complete Workflow Documentation

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Database Schema](#database-schema)
5. [Component Structure](#component-structure)
6. [Functions Analysis](#functions-analysis)
7. [CRUD Operations](#crud-operations)
8. [File Upload Flow](#file-upload-flow)
9. [Complete Workflow](#complete-workflow)
10. [Data Flow Diagrams](#data-flow-diagrams)

---

## Overview

The **Agency Details** component ([agency-details.tsx](file:///home/pratik/Desktop/project/new-sm3/src/components/forms/agency-details.tsx)) is a comprehensive form for collecting and managing factory agency information. It handles multiple document categories including occupier details, ID proofs, factory licenses, ownership documents, and regulatory compliance documents.

**Primary Purpose**: Collect, validate, and persist factory agency documentation to MongoDB database with file upload capabilities.

---

## Technology Stack

| Layer               | Technology            | Purpose                   |
| ------------------- | --------------------- | ------------------------- |
| **Frontend**        | React 18 + TypeScript | UI Component              |
| **Form Management** | React Hook Form       | Form state management     |
| **Validation**      | Zod                   | Schema validation         |
| **Database**        | MongoDB + Mongoose    | Data persistence          |
| **Authentication**  | Clerk                 | User authentication       |
| **File Upload**     | UploadThing           | File storage service      |
| **UI Components**   | Custom UI components  | Card, Form, Input, Button |
| **Routing**         | Next.js App Router    | Page navigation           |

---

## Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[AgencyDetails Component]
        B[FileUpload Component]
        C[React Hook Form]
    end

    subgraph "Validation Layer"
        D[Zod Schemas]
    end

    subgraph "Server Actions"
        E[queries.ts]
        F[initUser]
        G[getUser]
        H[upsertAgency]
        I[deleteAgency]
        J[updateDocument]
        K[deleteFile]
    end

    subgraph "Database Layer"
        L[(MongoDB)]
        M[User Model]
        N[Agency Model]
    end

    subgraph "File Storage"
        O[UploadThing Service]
    end

    A --> C
    B --> O
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    E --> K
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> O
    L --> M
    L --> N
```

---

## Database Schema

### User Model ([user.model.ts](file:///home/pratik/Desktop/project/new-sm3/src/models/user.model.ts))

```typescript
interface IUser {
  name: string; // User's full name
  email: string; // Unique email (lowercase, trimmed)
  avatar: string; // Profile image URL
  role: "Admin" | "User"; // User role (default: 'User')
}
```

**MongoDB Schema Features**:

- Timestamps: `createdAt`, `updatedAt`
- Unique constraint on email
- Auto-lowercase email normalization

### Agency Model ([agency.model.ts](file:///home/pratik/Desktop/project/new-sm3/src/models/agency.model.ts))

```typescript
interface IAgency {
  _id: ObjectId;
  user: ObjectId; // Reference to User model

  // Basic Information
  occupierDocuments: {
    name: string; // Required
    photo: string; // Required - UploadThing URL
    signature: string; // Required - UploadThing URL
  };

  // ID Proofs (at least one required)
  applicantIdProof: {
    electionId?: string;
    drivingLicense?: string;
    aadharCard?: string;
    passport?: string;
    panCard?: string;
  };

  // Previous Licenses
  previousFactoryLicense: {
    previousFactoryLicense?: string;
    planApprovalLetter?: string;
  };

  // Company Documents
  privateLimitedCompany: {
    listOfDirectors?: string;
    moa?: string; // Memorandum of Association
    boardResolution?: string;
    form32?: string;
  };

  // Manufacturing Details
  listOfRawMaterials: {
    listOfRawMaterials?: string;
  };

  // Ownership Proofs (at least one required)
  ownershipDocuments: {
    leaveAndLicenseAgreement?: string;
    midcAllotmentLetter?: string;
    sevenTwelveExtract?: string; // 7/12 Extract
    taxReceipt?: string;
  };

  // NOC Documents (at least one required)
  localAuthorityNoC: {
    localAuthorityNoC?: string;
    corporationNoC?: string;
    grampanchayatNoC?: string;
    midcNoC?: string;
  };

  // Environmental Compliance
  mpcbConsent: {
    mpcbConsent: string; // Required - MPCB = Maharashtra Pollution Control Board
  };

  // Factory Layout
  sketchFactory: {
    sketch?: string;
  };

  // Utilities
  electricityBill: {
    electricityBill?: string;
    loadSanctionletter?: string;
  };

  // Acceptance Documents
  acceptanceLetter: {
    acceptanceLetter?: string;
  };

  // Process Documentation
  flowChart: {
    flowChart?: string;
  };

  // Status
  status: "pending" | "approved" | "rejected"; // Default: 'pending'

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

**Key Schema Characteristics**:

- All file fields store UploadThing URLs (strings)
- User reference enables population queries
- Status field for approval workflow
- Automatic timestamps via Mongoose

---

## Component Structure

### File Location

`/home/pratik/Desktop/project/new-sm3/src/components/forms/agency-details.tsx`

### Component Hierarchy

```
AgencyDetails (Main Component)
├── Form (React Hook Form wrapper)
│   ├── Basic Information Section
│   │   ├── Name Input Field
│   │   ├── List of Directors Input Field
│   │   ├── Photo Upload (renderFileUploadField)
│   │   └── Signature Upload (renderFileUploadField)
│   │
│   ├── ID Proofs Section
│   │   ├── Election ID Upload
│   │   ├── Driving License Upload
│   │   ├── Aadhar Card Upload
│   │   ├── Passport Upload
│   │   └── PAN Card Upload
│   │
│   ├── Required Documents Section
│   │   ├── Previous Factory License
│   │   ├── Plan Approval Letter
│   │   ├── MOA
│   │   ├── Board Resolution
│   │   ├── Form 32
│   │   ├── List of Raw Materials
│   │   ├── Ownership Documents (4 types)
│   │   ├── NOC Documents (4 types)
│   │   ├── MPCB Consent
│   │   ├── Factory Sketch
│   │   ├── Electricity Documents (2 types)
│   │   ├── Acceptance Letter
│   │   └── Flow Chart
│   │
│   └── Submit Button
```

---

## Functions Analysis

### 1. getIconForDocument()

**Location**: Lines 127-141
**Type**: Helper Function
**Purpose**: Maps document field names to appropriate Lucide icons

```typescript
const getIconForDocument = (name: string) => {
  const icons = {
    photo: User,
    signature: FileText,
    electionId: FileCheck,
    drivingLicense: FileCheck,
    aadharCard: FileCheck,
    passport: FileCheck,
    panCard: FileCheck,
    moa: Files,
    boardResolution: Users,
    default: FileText,
  };
  return icons[name as keyof typeof icons] || icons.default;
};
```

**Flow**:

1. Takes document field name as input
2. Looks up corresponding icon from predefined map
3. Returns icon component or default FileText icon

---

### 2. AgencyDetails Component (Main)

**Location**: Lines 143-539
**Type**: React Functional Component
**Props**: `{ data?: any }`

#### State Initialization

```typescript
const { toast } = useToast(); // Toast notifications
const router = useRouter(); // Next.js router
const form = useForm<FormSchemaType>({
  // React Hook Form instance
  resolver: zodResolver(FormSchema), // Zod validation
  defaultValues: {
    /* ... */
  }, // Pre-populate from props.data
});
```

**Default Values Logic**:

- If `data` prop exists (edit mode), pre-populate fields
- Otherwise, use empty strings (create mode)

---

### 3. renderFileUploadField()

**Location**: Lines 167-208
**Type**: Component Method
**Purpose**: Renders a standardized file upload field with validation

**Parameters**:

```typescript
(
  section: string,           // e.g., 'occupierDocuments'
  field: string,             // e.g., 'photo'
  label: string,             // Display label
  required = true,           // Validation flag
  apiEndpoint = 'pdfUploader' // 'pdfUploader' | 'imageUploader'
)
```

**Implementation Details**:

```typescript
const renderFileUploadField = (
  section,
  field,
  label,
  required,
  apiEndpoint
) => {
  const Icon = getIconForDocument(field);

  return (
    <FormField
      control={form.control}
      name={`${section}.${field}`} // Nested field path
      render={({ field: formField }) => (
        <FormItem>
          {/* Styled container with icon and label */}
          <FileUpload
            apiEndpoint={apiEndpoint} // Route to UploadThing
            onChange={formField.onChange} // Update form state
            value={formField.value || ""} // Current value
          />
          <FormMessage /> {/* Validation errors */}
        </FormItem>
      )}
    />
  );
};
```

**Features**:

- Icon-based visual identification
- Optional field indicator
- Hover effects and transitions
- Integrated validation messaging
- Supports both PDF and image uploads

---

### 4. handleSubmit()

**Location**: Lines 210-268
**Type**: Form Submission Handler
**Purpose**: Process form data and save to database

**Flow Diagram**:

```mermaid
flowchart TD
    A[Form Submit] --> B{Data exists?}
    B -->|Yes - Update| C[Prepare bodyData object]
    B -->|No - Create| D[Call initUser]
    C --> D
    D --> E[Fetch current user with getUser]
    E --> F[Generate ID: data.id or UUID v4]
    F --> G[Call upsertAgency with all form values]
    G --> H{Success?}
    H -->|Yes| I[Show success toast]
    H -->|No| J[Show error toast]
    I --> K{data.id exists?}
    K -->|Yes| L[Redirect to /inspection-view]
    K -->|No| M{Response exists?}
    M -->|Yes| L
    M -->|No| N[End]
    J --> N
```

**Detailed Implementation**:

```typescript
const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
  try {
    // STEP 1: Initialize user if needed
    const newUserData = await initUser({});

    // STEP 2: Fetch current user from DB
    const currentUser = await getUser();

    // STEP 3: Prepare agency data
    const agencyPayload = {
      id: data?.id ? data.id : v4(), // Update or create new ID
      user: currentUser?._id, // Link to user
      occupierDocuments: values.occupierDocuments,
      applicantIdProof: values.applicantIdProof,
      previousFactoryLicense: values.previousFactoryLicense,
      privateLimitedCompany: values.privateLimitedCompany,
      listOfRawMaterials: values.listOfRawMaterials,
      ownershipDocuments: values.ownershipDocuments,
      localAuthorityNoC: values.localAuthorityNoC,
      mpcbConsent: values.mpcbConsent,
      sketchFactory: values.sketchFactory,
      electricityBill: values.electricityBill,
      acceptanceLetter: values.acceptanceLetter,
      flowChart: values.flowChart,
    };

    // STEP 4: Upsert to database
    const response = await upsertAgency(agencyPayload);

    // STEP 5: Show success notification
    toast({ title: "Created Agency" });

    // STEP 6: Redirect to inspection view
    return router.push("/inspection-view");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Oppse!",
      description: "could not create your agency",
    });
  }
};
```

---

## CRUD Operations

All CRUD operations are defined in [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts)

### Database Connection

**Function**: `connectDB()` ([db.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/db.ts))

```typescript
export const connectDB = async () => {
  // Check if already connected
  if (mongoose.connections[0].readyState === 1) {
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connected to database ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
```

**Connection Pooling**: Mongoose automatically manages connection pooling. The function checks `readyState`:

- `0` = disconnected
- `1` = connected
- `2` = connecting
- `3` = disconnecting

---

### CREATE / UPDATE Operation

#### Function: `upsertAgency()`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L60-L205)
**Type**: Server Action (`'use server'`)
**Purpose**: Create new agency or update existing one

**Signature**:

```typescript
upsertAgency(agencyData: Partial<IAgency>): Promise<string | undefined>
```

**Algorithm**:

```mermaid
flowchart TD
    A[upsertAgency called] --> B[Find agency by _id]
    B --> C{Agency exists?}
    C -->|Yes| D[findByIdAndUpdate with $set]
    C -->|No| E[Create new Agency instance]
    D --> F[Return updated agency JSON]
    E --> G[Save new agency]
    G --> F
    F --> H[Return stringified result]
```

**Implementation**:

```typescript
export const upsertAgency = async (agencyData: Partial<IAgency>) => {
  try {
    // STEP 1: Check if agency exists
    let agency = await Agency.findOne({ _id: agencyData._id });

    if (agency) {
      // UPDATE PATH
      agency = await Agency.findByIdAndUpdate(
        agency._id,
        {
          $set: {
            ...agencyData,
            occupierDocuments: {
              name: agencyData.occupierDocuments?.name,
              photo: agencyData.occupierDocuments?.photo,
              signature: agencyData.occupierDocuments?.signature,
            },
            applicantIdProof: {
              electionId: agencyData.applicantIdProof?.electionId,
              drivingLicense: agencyData.applicantIdProof?.drivingLicense,
              aadharCard: agencyData.applicantIdProof?.aadharCard,
              passport: agencyData.applicantIdProof?.passport,
              panCard: agencyData.applicantIdProof?.panCard,
            },
            // ... all other nested documents
          },
        },
        { new: true } // Return updated document
      );
    } else {
      // CREATE PATH
      agency = new Agency({
        ...agencyData,
        occupierDocuments: {
          /* same structure */
        },
        applicantIdProof: {
          /* same structure */
        },
        // ... all other fields
        user: agencyData.user, // Link to user
      });
      await agency.save();
    }

    return JSON.stringify(agency);
  } catch (error) {
    console.log(error);
  }
};
```

**Key Features**:

- Uses `$set` operator for partial updates
- Explicitly maps all nested fields to avoid schema issues
- Returns stringified JSON for Next.js serialization
- Handles both create and update in single function

---

### READ Operations

#### Function: `getAgencies()`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L206-L217)
**Purpose**: Fetch all agencies with user info

```typescript
export const getAgencies = async () => {
  try {
    await connectDB();
    const agencies = await Agency.find({})
      .populate("user") // Join with User collection
      .lean() // Convert to plain JS object
      .exec();

    return JSON.parse(JSON.stringify(agencies)); // Ensure serialization
  } catch (error) {
    console.error("Error getting agencies:", error);
    throw new Error("Error getting agencies");
  }
};
```

**Query Optimizations**:

- `.populate('user')`: Performs LEFT JOIN with User collection
- `.lean()`: Returns plain objects (faster, no Mongoose overhead)
- `.exec()`: Returns true Promise (not Mongoose thenable)

---

#### Function: `getAgency(id: string)`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L218-L231)
**Purpose**: Fetch single agency by ID

```typescript
export const getAgency = async (id: string): Promise<IAgency | null> => {
  try {
    await connectDB();
    const agency = await Agency.findOne({ _id: id })
      .populate("user")
      .lean()
      .exec();

    return agency as IAgency | null;
  } catch (error) {
    console.error("Error getting agency:", error);
    throw new Error("Error getting agency");
  }
};
```

---

#### Function: `getAgenciesByUser(userId: string)`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L359-L371)
**Purpose**: Fetch all agencies for specific user

```typescript
export const getAgenciesByUser = async (userId: string) => {
  try {
    await connectDB();
    const agencies = await Agency.find({ user: userId })
      .populate("user")
      .lean()
      .exec();

    return JSON.parse(JSON.stringify(agencies));
  } catch (error) {
    console.error("Error getting agencies:", error);
    throw new Error("Error getting agencies");
  }
};
```

---

### DELETE Operation

#### Function: `deleteAgency(id: string)`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L232-L304)
**Purpose**: Delete agency and all associated files from UploadThing

**Comprehensive Cleanup Flow**:

```mermaid
flowchart TD
    A[deleteAgency called] --> B[Find agency by ID]
    B --> C{Agency exists?}
    C -->|No| D[Return 'Agency not found']
    C -->|Yes| E[Delete occupier photo]
    E --> F[Delete occupier signature]
    F --> G[Delete all ID proofs - 5 files]
    G --> H[Delete factory licenses - 2 files]
    H --> I[Delete company docs - 3 files]
    I --> J[Delete raw materials doc]
    J --> K[Delete ownership docs - 4 files]
    K --> L[Delete NOC docs - 4 files]
    L --> M[Delete MPCB consent]
    M --> N[Delete factory sketch]
    N --> O[Delete electricity docs - 2 files]
    O --> P[Delete acceptance letter]
    P --> Q[Delete flow chart]
    Q --> R[Delete agency document from DB]
    R --> S[Return deleted agency]
```

**Implementation** (abbreviated):

```typescript
export const deleteAgency = async (id: string) => {
  try {
    await connectDB();
    const agency = await Agency.findById({ id });

    if (!agency) return "Agency not found";

    // Delete all uploaded files from UploadThing
    agency?.occupierDocuments?.photo &&
      deleteFile({ fileKey: agency.occupierDocuments.photo });

    agency?.occupierDocuments?.signature &&
      deleteFile({ fileKey: agency.occupierDocuments.signature });

    agency?.applicantIdProof?.electionId &&
      deleteFile({ fileKey: agency.applicantIdProof.electionId });

    // ... delete all other files (total ~25 file fields)

    // Finally delete the agency document
    await Agency.findByIdAndDelete({ _id: id });

    return agency;
  } catch (error) {
    console.error("Error deleting agency:", error);
    throw new Error("Error deleting agency");
  }
};
```

**Total Files Cleaned**:

- Occupier: 2 files
- ID Proofs: 5 files
- Factory Licenses: 2 files
- Company Documents: 3 files
- Raw Materials: 1 file
- Ownership: 4 files
- NOC: 4 files
- MPCB: 1 file
- Sketch: 1 file
- Electricity: 2 files
- Acceptance: 1 file
- Flow Chart: 1 file
- **Total: ~27 potential files**

---

### UPDATE Operation (Specific Document)

#### Function: `updateDocument()`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L305-L329)
**Purpose**: Update a single document field and delete old file

```typescript
export const updateDocument = async (
  id: string,
  documentPath: string, // e.g., 'occupierDocuments.photo'
  newDocument: string // New UploadThing URL
) => {
  try {
    await connectDB();

    // STEP 1: Fetch agency
    const agency = await Agency.findOne({ id });

    // STEP 2: Get old document URL
    let doc = agency?.[documentPath];

    // STEP 3: Delete old file from UploadThing
    await deleteFile(doc);

    // STEP 4: Update document reference
    doc = newDocument;

    // STEP 5: Save to database
    await Agency.findByIdAndUpdate(
      agency?._id,
      {
        $set: {
          [documentPath]: doc, // Dynamic field update
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
};
```

**Usage Example**:

```typescript
await updateDocument(
  "agency-id-123",
  "occupierDocuments.photo",
  "https://uploadthing.com/new-photo.jpg"
);
```

---

### User-Related Queries

#### Function: `initUser()`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L14-L36)
**Purpose**: Sync Clerk user to MongoDB (upsert)

```typescript
export const initUser = async (newUser: Partial<IUser>) => {
  const user = await currentUser(); // Clerk SDK
  if (!user) return;

  try {
    await connectDB();

    const userData = await User.updateOne(
      { email: user.emailAddresses[0].emailAddress }, // Query
      {
        ...newUser,
        id: user.id,
        avatar: user.imageUrl,
        name: `${user.firstName} ${user.lastName}`,
      },
      { upsert: true } // Create if not exists
    );

    return userData;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};
```

**When Called**:

- During form submission in `handleSubmit()`
- Ensures user exists in MongoDB before creating agency

---

#### Function: `getUser()`

**Location**: [queries.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/queries.ts#L40-L59)
**Purpose**: Fetch current authenticated user from MongoDB

```typescript
let userData: any; // Module-level cache

export const getUser = async () => {
  if (userData) return userData; // Return cached if available

  try {
    const user = await currentUser(); // From Clerk
    if (!user) return;

    await connectDB();

    let userData = await User.findOne({
      email: user.emailAddresses[0].emailAddress,
    })
      .lean()
      .exec();

    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Error getting user");
  }
};
```

**Caching Strategy**: Module-level variable caches user data to reduce DB calls

---

## File Upload Flow

### UploadThing Integration

The application uses **UploadThing** for file storage instead of direct cloud storage providers.

#### Configuration Files

**Server API** ([server/uploadthing.ts](file:///home/pratik/Desktop/project/new-sm3/src/server/uploadthing.ts)):

```typescript
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});
```

**Client Library** (Expected in [lib/uploadthing.ts](file:///home/pratik/Desktop/project/new-sm3/src/lib/uploadthing.ts)):

- Exports `UploadDropzone` component
- Configures client-side upload endpoints

---

### File Upload Component

**Component**: [file-upload.tsx](file:///home/pratik/Desktop/project/new-sm3/src/components/file-upload.tsx)

```typescript
type Props = {
  apiEndpoint: "imageUploader" | "pdfUploader";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split(".").pop();

  // If file already uploaded, show preview
  if (value) {
    return (
      <div>
        {type !== "pdf" ? (
          <Image src={value} alt="uploaded image" />
        ) : (
          <a href={value} target="_blank">
            View PDF
          </a>
        )}
        <button onClick={() => onChange("")}>Remove File</button>
      </div>
    );
  }

  // Otherwise show upload dropzone
  return (
    <UploadDropzone
      endpoint={apiEndpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url); // Update form with URL
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
```

---

### Upload Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant FileUpload
    participant UploadThing
    participant ReactHookForm
    participant Database

    User->>FileUpload: Drop/Select File
    FileUpload->>UploadThing: Upload file via API
    UploadThing-->>FileUpload: Return file URL
    FileUpload->>ReactHookForm: onChange(url)
    ReactHookForm->>ReactHookForm: Update form state
    User->>ReactHookForm: Submit Form
    ReactHookForm->>Database: Save form data with file URLs
    Database-->>User: Success confirmation
```

**Step-by-Step Process**:

1. **User Interaction**:

   - User drops file into `UploadDropzone` component
   - Or clicks to browse and select file

2. **Client Upload**:

   ```typescript
   <UploadDropzone
     endpoint="pdfUploader" // or "imageUploader"
     onClientUploadComplete={(res) => {
       onChange(res?.[0].url); // Trigger form update
     }}
   />
   ```

3. **UploadThing Processing**:

   - File uploaded to UploadThing servers
   - Server validates file type and size
   - Returns CDN URL: `https://uploadthing.com/f/abc123.pdf`

4. **Form State Update**:

   ```typescript
   formField.onChange(url); // Updates React Hook Form
   ```

5. **Form Submission**:

   - All file URLs included in form values
   - Sent to `upsertAgency()` function
   - Stored as strings in MongoDB

6. **File Deletion** (when agency deleted):
   ```typescript
   const deleteFile = async ({ fileKey }: { fileKey: string | string[] }) => {
     const result = await utapi.deleteFiles(fileKey);
     return result;
   };
   ```

---

### UploadThing API Endpoints

The application defines two upload endpoints:

| Endpoint        | Accepted Types          | Max Size            | Purpose                     |
| --------------- | ----------------------- | ------------------- | --------------------------- |
| `imageUploader` | Images (jpg, png, etc.) | Configured in route | Occupier photos, signatures |
| `pdfUploader`   | PDF documents           | Configured in route | All document uploads        |

**Endpoint Configuration** (Expected in `/api/uploadthing/route.ts`):

```typescript
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return { url: file.url };
    }
  ),

  pdfUploader: f({ pdf: { maxFileSize: "16MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return { url: file.url };
    }
  ),
};
```

---

## Complete Workflow

### Create New Agency Flow

```mermaid
flowchart TD
    Start[User Opens Form] --> LoadForm[AgencyDetails Component Renders]
    LoadForm --> EmptyForm[Empty Form Displayed]
    EmptyForm --> UserFills[User Fills Basic Info]
    UserFills --> UploadFiles[User Uploads Documents]

    UploadFiles --> Upload1[File → UploadThing]
    Upload1 --> Upload2[Get CDN URL]
    Upload2 --> Upload3[Update Form Field]
    Upload3 --> MoreFiles{More files?}
    MoreFiles -->|Yes| UploadFiles
    MoreFiles -->|No| ValidateForm[Validate with Zod Schemas]

    ValidateForm --> IsValid{Valid?}
    IsValid -->|No| ShowErrors[Display Validation Errors]
    ShowErrors --> UserFills

    IsValid -->|Yes| Submit[handleSubmit called]
    Submit --> InitUser[initUser - Sync Clerk to MongoDB]
    InitUser --> GetUser[getUser - Fetch user._id]
    GetUser --> GenID[Generate UUID v4 for agency]
    GenID --> Upsert[upsertAgency with all data]

    Upsert --> SaveDB[Save to MongoDB]
    SaveDB --> Success{Success?}
    Success -->|Yes| Toast1[Show success toast]
    Toast1 --> Redirect[Redirect to /inspection-view]
    Success -->|No| Toast2[Show error toast]
    Toast2 --> End[End]
    Redirect --> End
```

---

### Edit Existing Agency Flow

```mermaid
flowchart TD
    Start[User Opens Form with data prop] --> LoadForm[AgencyDetails Component Renders]
    LoadForm --> PopulateForm[Populate form with data.* values]
    PopulateForm --> ShowFiles[Display uploaded file previews]
    ShowFiles --> UserEdits[User Modifies Fields]

    UserEdits --> ChangeFile{Replace file?}
    ChangeFile -->|Yes| DeleteOld[Click X to remove]
    DeleteOld --> UploadNew[Upload new file]
    UploadNew --> UpdateField[Update form field with new URL]
    ChangeFile -->|No| ValidateForm
    UpdateField --> ValidateForm[Validate with Zod]

    ValidateForm --> IsValid{Valid?}
    IsValid -->|No| ShowErrors[Display errors]
    ShowErrors --> UserEdits

    IsValid -->|Yes| Submit[handleSubmit called]
    Submit --> InitUser[initUser - sync user]
    InitUser --> GetUser[getUser - get user._id]
    GetUser --> UseExisting[Use existing data.id]
    UseExisting --> Upsert[upsertAgency with data.id]

    Upsert --> FindExisting[FindOne by _id]
    FindExisting --> UpdateDB[findByIdAndUpdate with $set]
    UpdateDB --> Success{Success?}

    Success -->|Yes| Toast1[Show success toast]
    Toast1 --> Redirect[Redirect to /inspection-view]
    Success -->|No| Toast2[Show error toast]
    Toast2 --> End
    Redirect --> End
```

---

### Delete Agency Flow

```mermaid
flowchart TD
    Start[Delete Agency Triggered] --> GetAgency[Find agency by ID]
    GetAgency --> Exists{Agency exists?}
    Exists -->|No| ReturnError[Return 'Agency not found']

    Exists -->|Yes| StartDelete[Begin file deletion]
    StartDelete --> Del1[Delete occupier photo from UploadThing]
    Del1 --> Del2[Delete occupier signature]
    Del2 --> Del3[Delete all 5 ID proofs]
    Del3 --> Del4[Delete factory licenses]
    Del4 --> Del5[Delete company documents]
    Del5 --> Del6[Delete raw materials]
    Del6 --> Del7[Delete ownership docs]
    Del7 --> Del8[Delete NOC documents]
    Del8 --> Del9[Delete MPCB consent]
    Del9 --> Del10[Delete factory sketch]
    Del10 --> Del11[Delete electricity docs]
    Del11 --> Del12[Delete acceptance letter]
    Del12 --> Del13[Delete flow chart]

    Del13 --> DeleteDoc[findByIdAndDelete agency document]
    DeleteDoc --> ReturnSuccess[Return deleted agency]
    ReturnSuccess --> End[End]
    ReturnError --> End
```

---

## Data Flow Diagrams

### Form Validation Flow

```mermaid
graph LR
    A[User Input] --> B[React Hook Form]
    B --> C{Zod Validation}
    C -->|Pass| D[handleSubmit]
    C -->|Fail| E[FormMessage Component]
    E --> F[Display Error]
    F --> A
    D --> G[Server Action]
```

---

### Authentication & User Sync Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Clerk
    participant initUser
    participant MongoDB

    Browser->>Clerk: User logged in
    Clerk-->>Browser: User object with email
    Browser->>initUser: Sync user
    initUser->>Clerk: currentUser()
    Clerk-->>initUser: User details
    initUser->>MongoDB: updateOne with upsert
    MongoDB-->>initUser: User document
    initUser-->>Browser: User synced
```

---

### Complete Data Journey

```mermaid
graph TB
    subgraph "Frontend"
        A[User Browser] --> B[AgencyDetails Component]
        B --> C[React Hook Form]
        C --> D[Zod Validation]
        D --> E[FileUpload Components]
    end

    subgraph "File Storage"
        E --> F[UploadThing Service]
        F --> G[CDN URLs]
    end

    subgraph "Server Actions"
        G --> H[handleSubmit]
        H --> I[initUser]
        H --> J[getUser]
        H --> K[upsertAgency]
    end

    subgraph "Database"
        I --> L[(Users Collection)]
        J --> L
        K --> M[(Agencies Collection)]
        M --> N[Reference to User]
        N -.-> L
    end

    M --> O[Success Response]
    O --> P[Redirect to /inspection-view]
```

---

## Form Validation Schemas

### Zod Schema Breakdown

The form uses **12 nested schemas** combined into a single `FormSchema`:

| Schema                         | Required Fields              | Validation Rules         |
| ------------------------------ | ---------------------------- | ------------------------ |
| `occupierDocumentsSchema`      | `name`, `photo`, `signature` | All required, min 1 char |
| `applicantIdProofSchema`       | At least one ID              | Custom refine validator  |
| `previousFactoryLicenseSchema` | None                         | All optional             |
| `privateLimitedCompanySchema`  | None                         | All optional             |
| `listOfRawMaterialsSchema`     | None                         | All optional             |
| `ownershipDocumentsSchema`     | At least one doc             | Custom refine validator  |
| `localAuthorityNoCSchema`      | At least one NOC             | Custom refine validator  |
| `mpcbConsentSchema`            | `mpcbConsent`                | Required string          |
| `sketchFactorySchema`          | None                         | All optional             |
| `electricityBillSchema`        | At least one doc             | Custom refine validator  |
| `acceptanceLetterSchema`       | None                         | All optional             |
| `flowChartSchema`              | None                         | All optional             |

**Custom Refinement Example**:

```typescript
const applicantIdProofSchema = z
  .object({
    electionId: z.string().optional(),
    drivingLicense: z.string().optional(),
    aadharCard: z.string().optional(),
    passport: z.string().optional(),
    panCard: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one ID proof document is required",
  });
```

This ensures at least one ID proof is uploaded, providing flexibility while maintaining data integrity.

---

## Key Technical Decisions

### 1. Why Upsert Pattern?

Instead of separate create/update functions, `upsertAgency` handles both:

**Benefits**:

- Single API for both operations
- Simpler client code
- Prevents duplicate logic
- Transaction-safe

**Trade-offs**:

- More complex function
- Requires explicit field mapping

---

### 2. Why String URLs Instead of File Objects?

Files are uploaded to UploadThing, and only URLs are stored in MongoDB.

**Benefits**:

- Smaller database size
- Faster queries
- No GridFS complexity
- CDN-backed delivery
- Easy to update/delete files independently

**Trade-offs**:

- External service dependency
- Need to track file keys for deletion

---

### 3. Why Module-Level User Cache?

```typescript
let userData: any;
export const getUser = async () => {
  if (userData) return userData;
  // ... fetch from DB
};
```

**Benefits**:

- Reduces database calls during same request
- Faster form submissions

**Trade-offs**:

- Cache invalidation not implemented
- Doesn't work across requests (serverless)

> **Note**: This cache only works within a single request lifecycle in Next.js server actions.

---

### 4. Why Explicit Field Mapping in Upsert?

Instead of spreading the entire object:

```typescript
$set: {
  ...agencyData,  // ❌ Could cause type issues
  occupierDocuments: {
    name: agencyData.occupierDocuments?.name,  // ✅ Explicit
    photo: agencyData.occupierDocuments?.photo,
    signature: agencyData.occupierDocuments?.signature,
  },
  // ...
}
```

**Reason**: Mongoose schema strict mode requires explicit field mapping for nested objects to prevent validation errors and ensure type safety.

---

## API Usage Summary

### Component-Level APIs

| Function              | Purpose                             | Returns             |
| --------------------- | ----------------------------------- | ------------------- |
| `useForm()`           | Initialize form with Zod validation | Form methods object |
| `form.handleSubmit()` | Wrap submission handler             | Submit function     |
| `form.control`        | Pass to FormField for registration  | Control object      |
| `useToast()`          | Show notifications                  | Toast function      |
| `useRouter()`         | Navigate between pages              | Router object       |

---

### Server Action APIs

| Function           | Operation                  | Input              | Output                 |
| ------------------ | -------------------------- | ------------------ | ---------------------- |
| `initUser()`       | Sync Clerk user to MongoDB | `Partial<IUser>`   | Update result          |
| `getUser()`        | Fetch current user         | None               | `IUser` or `undefined` |
| `upsertAgency()`   | Create/update agency       | `Partial<IAgency>` | Stringified agency     |
| `getAgencies()`    | Fetch all agencies         | None               | `IAgency[]`            |
| `getAgency()`      | Fetch single agency        | `id: string`       | `IAgency` or `null`    |
| `deleteAgency()`   | Delete agency + files      | `id: string`       | Deleted agency         |
| `updateDocument()` | Update single field        | `id, path, newUrl` | `void`                 |
| `deleteFile()`     | Delete from UploadThing    | `fileKey: string`  | Delete result          |

---

## Environment Variables

Required in `.env`:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your-app-id
```

---

## Future Enhancements

Based on code analysis, potential improvements:

1. **Error Handling**:

   - Add try-catch in `renderFileUploadField`
   - Better error messages for file upload failures

2. **Performance**:

   - Implement proper request-level caching
   - Add loading states during file uploads
   - Lazy load file previews

3. **Validation**:

   - Add file size/type validation on client
   - Validate file URLs before saving

4. **User Experience**:

   - Add progress bars for file uploads
   - Enable drag-and-drop for multiple files
   - Add preview before submission

5. **Database**:
   - Add indexes on `user` field for faster queries
   - Implement soft deletes instead of hard deletes
   - Add audit trail for updates

---

## Conclusion

The Agency Details component is a robust, production-ready form system that demonstrates:

- **Type Safety**: TypeScript + Zod validation
- **Modern React**: Hooks, server actions, Next.js 13+
- **Scalable Architecture**: Separation of concerns (UI, validation, data)
- **File Management**: Integrated UploadThing with cleanup
- **Database Design**: Normalized MongoDB schema with references
- **User Experience**: Real-time validation, toast notifications, responsive design

The workflow ensures data integrity while providing a smooth user experience for managing complex factory documentation.
