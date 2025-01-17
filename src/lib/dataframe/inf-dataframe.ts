import { BaseDataFrame, DEFAULT_SHEET_NAME } from './base-dataframe'
import type { IndexType, Shape } from './dataframe-types'

export class InfDataFrame extends BaseDataFrame {
  private _rows: number
  private _cols: number

  constructor(
    name: string = 'Sheet 1',
    rows: number = 131072,
    cols: number = 16384
  ) {
    super(name)
    this._rows = rows
    this._cols = cols
  }

  override get shape(): Shape {
    return [this._rows, this._cols]
  }

  //@ts-ignore
  get(row: number, col: number): IndexType {
    return ''
  }
}

export const INF_DATAFRAME = new InfDataFrame(DEFAULT_SHEET_NAME)
