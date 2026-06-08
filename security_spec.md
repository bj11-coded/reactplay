# Security Specification: ReactPlay Docs Fortress Rules (Zero-Trust)

This specification defines the security invariants, role hierarchies, and threat models for the ReactPlay database in Firestore.

## 1. Role Hierarchies & Identities
* **Admin Role (Bootstrapped)**:
  * Users verified via Google OAuth whose email address strictly evaluates to `chy.bijay.890@gmail.com` with `email_verified == true`.
  * Admins have full write rights (create, update, delete) across global learning resource collections: `/lessons`, `/quizzes`, `/snippets`, `/projects`.
* **Standard Authenticated Users**:
  * Users with a valid Firebase Auth payload.
  * Can read all global resource lists and detail documents.
  * Can only read and write *their own* progress user documents at `/users/{userId}`.
* **Anonymous/Guest Users**:
  * Can read global resource lists and detail documents.
  * Cannot read or write user progress documents.

## 2. Core Data Invariants
* **UserProfile Privacy Boundary**: No user progress document may be read or written by another user or an unauthenticated anonymous client.
* **UserProfile Identifier Binding**: The `{userId}` path parameter must exactly match both `request.auth.uid` and the `uid` property inside the payload.
* **Content Immutability**: Standard readers can never bypass access lists to modify lesson contents or inject malicious code payloads into common snippets.
* **Timestamp Authenticity**: Write actions must use the standard Firestore server timestamp `request.time`.

## 3. Threat Payloads (The Forbidden Dirty Dozen)
The following payloads must compile to `PERMISSION_DENIED` at the Rules level:
1. **Identity Spoofing**: Authenticated user `auth.uid == "attacker"` tries to write `/users/victim`.
2. **Unauthenticated Profile Access**: Anonymous client tries to write `/users/anonymous_user`.
3. **Cross-User Profile Leak**: Authenticated user `auth.uid == "userA"` attempts direct `get` or `list` read on `/users/userB`.
4. **Extra Keys Injection**: User tries to inject a field `isAdmin: true` into their user profile.
5. **Junk Size Exhaustion**: Over-large character payload (> 100kb string) injected into fields like `savedPlaygroundCode`.
6. **Client Timestamp Forgery**: User attempts to pass `updatedAt = "2026-01-01"` on write.
7. **Type Mismatch (Lessons List)**: User attempts to pass standard string instead of a valid array for `completedLessons`.
8. **Null Value Bypass**: Authenticated user attempts to submit a profile with `uid` value set to `null`.
9. **Admin Spoofing**: Standard user `auth.email == "malicious@hack.com"` tries to write a custom document inside `/lessons/css-flexbox`.
10. **Admin Email Impersonation with Unverified Provider**: Triggering a write to `/lessons/css-grid` with email `chy.bijay.890@gmail.com` but `email_verified == false`.
11. **ID Poisoning Attack**: Target gets or writes with collection IDs exceeding 128 characters or special forbidden chars.
12. **Zombie Update Modification**: Altering immutable key fields like `uid` or `email` inside user profiles or trying to alter global lesson structures after final locking.
