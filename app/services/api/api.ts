import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { NASA_API_KEY } from "../../utils/constants"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of Astroids.
   */
  async getAstroidList() {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(url)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", astrioidList: response.data }
    } catch {
      return { kind: "bad-data"}
    }
  }

  /**
   * Gets a single astroid by ID
   */

   async getAstroidById(astroidId: number){
   
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${astroidId}?api_key=DXkrb5Kye4BVoBjHgPwgeaWcuZAbwhX4SMRcnYuH`
    // // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(url)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return Promise.resolve({ kind: "ok", astrioid: response.data })
    } catch {
      return Promise.reject({ kind: "bad-data"})
    }
  }

}
