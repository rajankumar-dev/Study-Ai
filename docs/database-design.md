# Database Design

## 1. User Collection

This collection stores all registered users of the platform.

When a user signs up, their name, email, and password are saved in this collection.
The email must be unique for each user.
The password is stored in a hashed format for security purposes.

Each user is identified by a unique `id`, which is used to link other data like notes and AI interactions.

---

## 2. Notes Collection

This collection stores all notes created or uploaded by users.

Each note belongs to a specific user and is linked using the `userId` field.
A user can create multiple notes.

The note contains a title and content, along with the creation timestamp.

---

## 3. AI Interaction Collection

This collection stores all AI-related activities performed by users.

Whenever a user interacts with the AI (such as generating summaries, questions, or chatting), the query and response are stored here.

Each interaction is linked to a user using the `userId` field.
The `type` field is used to identify the kind of AI operation.

---

## 4. Relationships

The database follows a One-to-Many relationship structure:

- One user can have multiple notes
- One user can have multiple AI interactions

Each note and AI interaction is connected to a user using the `userId` field.

---
