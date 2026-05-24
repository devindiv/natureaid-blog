// sanity/schemaTypes/consultation.ts
const consultationSchema = {
  name: 'consultation',
  title: 'Consultation Requests',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'interest',
      title: 'Area of Interest',
      type: 'string',
      options: {
        list: [
          {title: 'Ayurveda & Dosha Balancing', value: 'ayurveda'},
          {title: 'Nutrition & Diet', value: 'nutrition'},
          {title: 'Preventative Care', value: 'preventative'},
          {title: 'Hormonal Health', value: 'hormonal'},
          {title: 'General Wellbeing', value: 'general'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Booked', value: 'booked'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
    },
    prepare({title, subtitle}: {title: string; subtitle: string}) {
      return {
        title: title || 'Unknown',
        subtitle: subtitle,
      }
    },
  },
}

export default consultationSchema
