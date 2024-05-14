export const validDatasetInput = {
  name: 'Sam Person',
  appointment: {
    time: '10:00',
    location: 'Central',
    priority: 2
  },
  caseCode: 46
};

export const validDatasetConfig = [
  {
    headerRef: 'j2d8y22d',
    headerType: 'short_text',
    value: '{input.name}',
    isRequired: true
  },
  {
    headerRef: 'kjhf298y',
    headerType: 'short_text',
    value: '{input.appointment.time}',
    isRequired: true
  },
  {
    headerRef: 'f2oifh9q',
    headerType: 'short_text',
    value: '{input.appointment.location}',
    isRequired: true
  },
  {
    headerRef: 'fb1891g2',
    headerType: 'number',
    value: '{input.appointment.priority}',
    isRequired: false
  },
  {
    headerRef: 'mbhwf8ax',
    headerType: 'number',
    value: '{input.caseCode}',
    isRequired: true
  }
];

export const validDatasetConfigDirectAssignment = [
  {
    headerRef: 'j2d8y22d',
    headerType: 'short_text',
    value: 'Sam Person',
    isRequired: true
  },
  {
    headerRef: 'kjhf298y',
    headerType: 'short_text',
    value: '10:00',
    isRequired: true
  },
  {
    headerRef: 'f2oifh9q',
    headerType: 'short_text',
    value: 'Central',
    isRequired: true
  },
  {
    headerRef: 'fb1891g2',
    headerType: 'number',
    value: 2,
    isRequired: false
  },
  {
    headerRef: 'mbhwf8ax',
    headerType: 'number',
    value: 46,
    isRequired: true
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
