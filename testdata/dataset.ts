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
