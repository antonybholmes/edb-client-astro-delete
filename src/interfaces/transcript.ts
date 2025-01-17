import { type IBaseExon } from './base-exon'
import { type IExon } from './exon'
import type { IGenomicLocation } from './genomic-location'

export interface ITranscript extends IBaseExon, IGenomicLocation {
  id: string
  geneId: string
  geneSymbol: string
  strand: string
  exons: IExon[]
}
