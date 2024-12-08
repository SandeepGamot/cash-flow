Cashflow is a simple app for group/family expense tracking.

#### Prerequisites for running locally: 
- have Docker installed and configured properly.
- have a personal google project setup for OAuth Login with respective creds.

### Running Instructions:

- make sure you have all the env variables in `api/.env` file as required under `api` service of `api/server.yml` file.

- make sure you're in the root of the project and run `docker compose up`

---

####  Feature List:
done: 
- [x] google oauth login
- [x] user roles (group admin & normal user)
- [x] add expense with categories, sub-categories, payment mode
- [x] dynamically added audit properties for all transactions like created_by, created_at, updated_at, updated_by
- [x] admin can approve/disapprove usage of categories, sub-categories and payment-mode

todo:
- [ ] income transaction
- [ ] dashboard consisting of summary of all flow of cash
- [ ] intra-group transfer transaction
- [ ] creation and manging of "vaults" to keep track of physical cash.
- [ ] make this a PWA with local-save and auto-sync when server's online.
