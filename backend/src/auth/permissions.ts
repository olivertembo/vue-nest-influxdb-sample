enum Actions {
  All = '*',
  ReadAll = 'Read-All',
  ReadOne = 'Read-One',
  CreateOne = 'Create-One',
  CreateMany = 'Create-Many',
  UpdateOne = 'Update-One',
  ReplaceOne = 'Replace-One',
  DeleteOne = 'Delete-One',
}

export default {
  user: {
    user: [],
  },
  public: {
    user: [],
    device: [],
    permission: [],
  },
};
