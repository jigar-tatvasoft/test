import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

const api = new Api();
api.setup()
/**
 * Example store containing Rick and Morty astroid
 */
export const AstroidStoreModel = types
  .model("AstroidStore")
  .props({
    astroidList: types.optional(types.frozen(), []),
    astroidDetail: types.optional(types.frozen(), null),
    loading: false,
  })
  .actions((self) => ({
    getAstroids: flow(function* getAstroids() {
      try {
      
        const data = yield api.getAstroidList();
        self.astroidList = data.astroidList.near_earth_objects
      } catch (error) {
        self.astroidList = []
      }
    }),
    getAstroidByID: flow(function* getAstroidByID(astroidId) {
      try {
        api.setup()
        self.loading = true
        const data = yield api.getAstroidById(astroidId);
        self.astroidDetail = data.astrioid
        self.loading = false
      } catch (error) {
        self.loading = false
      }
    }),
    updateAstroidDetail: (astroid) => {
      self.astroidDetail = astroid
    }
  }))

type AstroidStoreType = Instance<typeof AstroidStoreModel>
export interface AstroidStore extends AstroidStoreType {}
type AstroidStoreSnapshotType = SnapshotOut<typeof AstroidStoreModel>
export interface AstroidStoreSnapshot extends AstroidStoreSnapshotType {}
export const createAstroidStoreDefaultModel = () => types.optional(AstroidStoreModel, {})
