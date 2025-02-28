import { json } from "stream/consumers"

const workout_schema = {
    "type": "object",
    "properties": {
        "workout_name": {
            "type": "string",
            "description": "The name of the workout"
        },
        "exercises": {
            "type": "array",
            "description": "A list of exercises included in the workout",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The name of the exercise"
                    },
                    "sets": {
                        "type": "integer",
                        "minimum": 1,
                        "description": "Number of sets for the exercise"
                    },
                    "repetitions": {
                        "type": "integer",
                        "minimum": 1,
                        "description": "Number of repetitions per set"
                    }
                },
                "required": ["name", "sets", "repetitions"]
            }
        }
    },
    "required": ["workout_name", "exercises"]
};

export default workout_schema;