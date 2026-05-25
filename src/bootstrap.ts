import { connectDatabase } from './database/manager';

export default function bootstrapApp() {
  connectDatabase();
}
