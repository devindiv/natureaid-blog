export default {
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
};
