export const PI = Math.PI

export const LN_LOOKUP = [
  0, 0.693147181, 1.098612289, 1.386294361, 1.609437912, 1.791759469,
  1.945910149, 2.079441542, 2.197224577, 2.302585093, 2.397895273, 2.48490665,
  2.564949357, 2.63905733, 2.708050201, 2.772588722, 2.833213344, 2.890371758,
  2.944438979, 2.995732274, 3.044522438, 3.091042453, 3.135494216, 3.17805383,
  3.218875825, 3.258096538, 3.295836866, 3.33220451, 3.36729583, 3.401197382,
  3.433987204, 3.465735903, 3.496507561, 3.526360525, 3.555348061, 3.583518938,
  3.610917913, 3.63758616, 3.663561646, 3.688879454, 3.713572067, 3.737669618,
  3.761200116, 3.784189634, 3.80666249, 3.828641396, 3.850147602, 3.871201011,
  3.891820298, 3.912023005, 3.931825633, 3.951243719, 3.970291914, 3.988984047,
  4.007333185, 4.025351691, 4.043051268, 4.060443011, 4.077537444, 4.094344562,
  4.110873864, 4.127134385, 4.143134726, 4.158883083, 4.17438727, 4.189654742,
  4.204692619, 4.219507705, 4.234106505, 4.248495242, 4.262679877, 4.276666119,
  4.290459441, 4.304065093, 4.317488114, 4.33073334, 4.343805422, 4.356708827,
  4.369447852, 4.382026635, 4.394449155, 4.406719247, 4.418840608, 4.430816799,
  4.442651256, 4.454347296, 4.465908119, 4.477336814, 4.48863637, 4.49980967,
  4.510859507, 4.521788577, 4.532599493, 4.543294782, 4.553876892, 4.564348191,
  4.574710979, 4.584967479, 4.59511985, 4.605170186,
]

/**
 * Returns a numerically sorted array because JS default sort does not
 * work intuitively.
 *
 * @param a an array of numbers
 * @returns the array numerically sorted
 */
export function numSort(a: number[]) {
  return a.sort((a, b) => a - b)
}

export function makeCombinations<T>(items: T[]): T[][] {
  const combinations: T[][] = [[]]

  items.forEach((item: T) => {
    combinations.slice().forEach((comb: T[]) => {
      combinations.push(comb.concat([item]))
    })
  })

  return combinations
}

/**
 * Returns the indices of an array that pass a filtering criteria. Useful
 * for getting the indices in a dataframe that you want to keep etc.
 *
 * @param data  an array of data to filter
 * @param f     a function that maps a value in the array to true or false to
 *              determine if it should be kept
 * @returns     the indices where the applied function to the array is true.
 */
export function where(data: any[], f: (x: any) => boolean): number[] {
  return data
    .map((v, vi) => [v, vi])
    .filter(a => f(a[0]))
    .map(a => a[1])
}

export function minMax(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x))
}
