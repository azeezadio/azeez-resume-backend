import { Model, ModelClass } from 'objection';

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export default class BaseRepository<T extends Model> {
  constructor(protected readonly model: ModelClass<T>) {}

  findById(id: string) {
    return this.model.query().findById(id);
  }

  async list({ page = 1, limit = 20 }: PaginationQuery = {}) {
    return this.model
      .query()
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')
      .page(Math.max(page - 1, 0), limit);
  }

  create(data: Partial<T>) {
    return this.model.query().insert(data).returning('*');
  }

  update(id: string, data: Partial<T>) {
    return this.model.query().patchAndFetchById(id, data);
  }
}
