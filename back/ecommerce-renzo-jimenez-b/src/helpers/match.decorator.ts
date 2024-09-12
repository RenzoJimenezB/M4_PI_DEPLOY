import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    // object: the class instance where @Match is used
    // propertyName: name of the property where the @Match is applied
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      // name of the property that will be validated
      // (passwordConfirmation)
      options: validationOptions,
      constraints: [property],
      // array containing the name of the related property to match against
      // (password)
      validator: {
        validate(value: any, args: ValidationArguments) {
          // value: value of the property being validated
          // when a custom decorator is applied to a property, class-validator automatically
          // calls the validate method and passes the current value of the property being validated

          // args: information about the validation
          // (includes constraints and the entire object being validated)
          const [relatedPropertyName] = args.constraints;
          // array destructuring

          const relatedValue = (args.object as any)[relatedPropertyName];
          // args.object[propertyName]: TypeScript would throw an error because
          // it doesn't know what properties exist on this object

          // access a property of an object using bracket notation
          // if you have the name of the property as a string (dynamic property access)
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}
