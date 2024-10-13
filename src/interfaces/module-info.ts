export interface IModuleInfo {
  name: string
  description: string
  version: string
  copyright: string
}

export const NO_MODULE_INFO: IModuleInfo = {
  name: '',
  description: '',
  version: '',
  copyright: '',
}
