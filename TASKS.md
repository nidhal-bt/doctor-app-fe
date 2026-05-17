# Tasks

## Active Tasks

### Auth Guard
- [ ] Store `role` as a readable (non-httpOnly) cookie in `loginAction` + `signupAction` alongside the existing `token`
- [ ] Implement `middleware.ts`: read `token` cookie → redirect unauthenticated users hitting `/d/*` to `/login`
- [ ] Implement `middleware.ts`: read `role` cookie → redirect authenticated users hitting `/login` or `/register` to their dashboard
- [ ] Update matcher config to cover `/d/:path*`, `/login`, `/register`
- [ ] Update `loginAction` redirect: doctor → `/d/dr`, patient → `/d/pt`, secretary → `/d/sc`
- [ ] Update `signupAction` redirect: same role-based redirect as login
