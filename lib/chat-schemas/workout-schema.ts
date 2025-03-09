import { json } from "stream/consumers"

const workoutSchema = {
    type: "object",
    properties: {
      schedule: {
        type: "array",
        description: "A list of workout days with exercises",
        items: {
          type: "object",
          properties: {
            day: {
              type: "string",
              description: "The day of the workout (e.g., Monday, Wednesday, Friday)"
            },
            name: {
              type: "string",
              description: "The name of the workout for the day (e.g. Chest Day, Upper, Push etc...)"
            },
            exercises: {
              type: "array",
              description: "List of exercises for the day",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the exercise"
                  },
                  type: {
                    type: "string",
                    enum: ["compound", "isolation"],
                    description: "Whether the exercise is compound or isolation"
                  },
                  sets: {
                    type: "integer",
                    minimum: 1,
                    description: "Number of sets"
                  },
                  repetitions: {
                    type: "integer",
                    minimum: 1,
                    description: "Number of repetitions per set"
                  },
                  description : {
                    type: "string",
                    description: "Description of how to perform the workout, keep to one or two sentences"
                  }
                },
                required: ["name", "type", "sets", "repetitions", "description"]
              }
            }
          },
          required: ["day", "exercises"]
        }
      }
    },
    required: ["schedule"]
  };
  

export default workoutSchema;