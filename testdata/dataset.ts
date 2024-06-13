import { Field, Header } from '../src/interfaces/Dataset.js';

export const validDatasetInput = {
  name: 'Sam Person',
  site: {
    time: '10:00',
    location: 'Central'
  },
  priority: false,
  caseCode: 46
};

export const validDatasetPayload: Field[] = [
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
    value: false
  },
  {
    headerRef: 'mbhwf8ax',
    value: 46
  }
];

export const validDatasetHeaders: Header[] = [
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
    type: 'boolean',
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

export const validDatasetConfig = {
  j2d8y22d: '{input.name}',
  kjhf298y: '{input.site.time}',
  f2oifh9q: '{input.site.location}',
  fb1891g2: '{input.priority}',
  mbhwf8ax: '{input.caseCode}'
};

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

export const datasetStoredResponse = {
  metadata: {
    deletedAt: '',
    datasetName: ''
  },
  headers: {
    u: 1718030448267,
    h: [
      {
        i: 'OhiHdvAR',
        t: 'short_text',
        r: false,
        n: 'Name',
        p: 0,
        l: 'fa5b60b8-af43-4b56-b0f5-a7ddf86f2ff1'
      },
      {
        i: '1r_CEnPK',
        t: 'number',
        r: false,
        n: 'Salary',
        p: 1,
        l: 'fa5b60b8-af43-4b56-b0f5-a7ddf86f2ff1'
      },
      {
        i: 'jlSmJTnB',
        t: 'boolean',
        r: false,
        n: 'Is Staff?',
        p: 2,
        l: 'fa5b60b8-af43-4b56-b0f5-a7ddf86f2ff1'
      }
    ]
  },
  items: [
    {
      i: '01J03MFGE78QRTAWD7ERTE83Q0',
      f: [
        {
          h: 'OhiHdvAR',
          v: 'Sam Person'
        },
        {
          h: '1r_CEnPK',
          v: 12400
        },
        {
          h: 'jlSmJTnB',
          v: true
        }
      ]
    },
    {
      i: '01HZPHW7VSB646KE1H5V4NG6KR',
      f: [
        {
          h: '1r_CEnPK',
          v: 666
        },
        {
          h: 'OhiHdvAR',
          v: 'Conny'
        },
        {
          h: 'jlSmJTnB',
          v: false
        }
      ]
    },
    {
      i: '01HZP15SEHC4239670TGAGH46N',
      f: [
        {
          h: 'OhiHdvAR',
          v: 'Sonny'
        },
        {
          h: 'jlSmJTnB',
          v: false
        },
        {
          h: '1r_CEnPK',
          v: 12331
        }
      ]
    },
    {
      i: '01HZP15G623226RW08Q5EWHFVC',
      f: [
        {
          h: 'OhiHdvAR',
          v: 'Johnny'
        },
        {
          h: '1r_CEnPK',
          v: '123'
        }
      ]
    },
    {
      i: '01HZP1579SXAG17FBDVETG2NJA',
      f: [
        {
          h: 'OhiHdvAR',
          v: 'Mikael'
        },
        {
          h: '1r_CEnPK',
          v: '321'
        },
        {
          h: 'jlSmJTnB',
          v: true
        }
      ]
    },
    {
      i: '01HZP150YT35Y4D6N9V4C4296H',
      f: [
        {
          h: 'OhiHdvAR',
          v: 'Anton'
        },
        {
          h: '1r_CEnPK',
          v: '213123'
        },
        {
          h: 'jlSmJTnB',
          v: true
        }
      ]
    }
  ]
};
