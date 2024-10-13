import { BaseIndex } from './base-index'
import { cellStr } from './cell'
import type { SeriesType } from './dataframe-types'
import { NUM_INDEX, type IndexFromType } from './index'

export const DEFAULT_INDEX_NAME = 'id'

export class BaseSeries extends BaseIndex {
  get index(): BaseIndex {
    return NUM_INDEX
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIndex(_index: IndexFromType, _inplace: boolean = false): BaseSeries {
    return this
  }

  get values(): SeriesType[] {
    return []
  }

  /**
   * Return the values as strings
   */
  get strs(): string[] {
    return this.values.map(v => cellStr(v))
  }

  get uniq(): SeriesType[] {
    return [...new Set(this.values)].sort()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(_index: number, _v: SeriesType): BaseSeries {
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(_index: number): SeriesType {
    return NaN
  }

  map<T>(callback: (v: SeriesType, i: number) => T): T[] {
    return this.values.map((x, i) => callback(x, i))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter(_idx: number[]): BaseSeries {
    return this
  }

  copy(): BaseSeries {
    return this
  }
}

export const EMPTY_SERIES = new BaseSeries()
