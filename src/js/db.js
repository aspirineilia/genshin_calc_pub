import { DB } from "./db/DB";

if (typeof window !== 'undefined') {
    window.DB = DB
} else if (typeof self !== 'undefined') {
    self.DB = DB;
}
