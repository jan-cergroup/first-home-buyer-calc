export enum State {
  NSW = 'NSW',
  VIC = 'VIC',
  QLD = 'QLD',
  WA = 'WA',
  SA = 'SA',
  TAS = 'TAS',
  ACT = 'ACT',
  NT = 'NT',
}

export const STATE_LABELS: Record<State, string> = {
  [State.NSW]: 'New South Wales',
  [State.VIC]: 'Victoria',
  [State.QLD]: 'Queensland',
  [State.WA]: 'Western Australia',
  [State.SA]: 'South Australia',
  [State.TAS]: 'Tasmania',
  [State.ACT]: 'Australian Capital Territory',
  [State.NT]: 'Northern Territory',
}

export const ALL_STATES = Object.values(State)
