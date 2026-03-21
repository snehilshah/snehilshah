
## 2024-03-20 - Redundant I/O Operations in Next.js Page Generation
**Learning:** Found redundant `fs.readFileSync` calls loops while generating statically-rendered blog pages because the abstraction (`getFrontMatter`) was already doing the I/O. Such duplicated I/O increases build times unproductively.
**Action:** Audit build-time data fetching logic in Next.js apps using local files to ensure parsing abstractions aren't layered over redundant direct disk accesses.
