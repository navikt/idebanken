// Using the Person data type
const personType = "com_example_myapp_Person_Data";

export const extensions = (graphQL) => {
  return {
    creationCallbacks: {
      [personType]: function (params) {
        // Add a new field: age
        params.addFields({
          age: {
            type: graphQL.GraphQLInt,
          },
        });
      },
    },
    resolvers: {
      [personType]: {
        // Implement the age resolver
        age: (env) => {
          if (!env.source.dateofbirth) {
            return null;
          }

          // Calculate age
          let age = 0;
          const today = new Date();
          const birthDate = new Date(env.source.dateofbirth);
          age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();

          // Tune for month and day
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        },
      },
    },
  };
};
