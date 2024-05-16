export const validDatasetInput = [
  {
    headerRef: 'j2d8y22d',
    value: 'Sam Person'
  },
  {
    headerRef: 'kjhf298y',
    value: '10:00'
  },
  {
    headerRef: 'f2oifh9q',
    value: 'Central'
  },
  {
    headerRef: 'fb1891g2',
    value: 2
  },
  {
    headerRef: 'mbhwf8ax',
    value: 46
  }
];

export const validDatasetConfig = [
  {
    id: 'j2d8y22d',
    type: 'short_text',
    name: 'Name',
    isRequired: true,
    position: 0,
    lastChangedBy: 'user123'
  },
  {
    id: 'kjhf298y',
    type: 'short_text',
    name: 'Time',
    isRequired: true,
    position: 1,
    lastChangedBy: 'user123'
  },
  {
    id: 'f2oifh9q',
    type: 'short_text',
    name: 'Location',
    isRequired: true,
    position: 2,
    lastChangedBy: 'user123'
  },
  {
    id: 'fb1891g2',
    type: 'number',
    name: 'Priority',
    isRequired: true,
    position: 3,
    lastChangedBy: 'user123'
  },
  {
    id: 'mbhwf8ax',
    type: 'number',
    name: 'Case Code',
    isRequired: false,
    position: 4,
    lastChangedBy: 'user123'
  }
];

export const datasetGetResponse = {
  metadata: { deletedAt: '' },
  headers: {
    u: '100000000',
    h: [
      { i: 'k392dg', t: 'short_text', r: true, n: 'First Header', p: 0, l: 'user123' },
      { i: 'o2ufj2', t: 'short_text', r: false, n: 'Second Header', p: 1, l: 'user123' }
    ]
  },
  items: [
    { i: 'aj2831', f: [{ h: 'k392dg', v: 'something here' }] },
    { i: 'vjc923', f: [{ h: 'k392dg', v: 'whoops' }] },
    {
      i: 'k473nd',
      f: [
        { h: 'k392dg', v: 'more there' },
        { h: 'o2ufj2', v: 'whoa' }
      ]
    }
  ]
};
