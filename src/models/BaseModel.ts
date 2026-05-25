import { Model, Pojo } from 'objection';

export default abstract class BaseModel extends Model {
  id!: string;
  created_at!: string;
  updated_at!: string;
  deleted_at?: string | null;

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    delete json.deleted_at;
    return json;
  }
}
