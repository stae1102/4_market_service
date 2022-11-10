const SortType = {
  RECENT: 'RECENT',
  ORDERDEADLINE_DESC: 'ORDERDEADLINE_DESC',
} as const;

type SortType = typeof SortType[keyof typeof SortType];

export default SortType;
