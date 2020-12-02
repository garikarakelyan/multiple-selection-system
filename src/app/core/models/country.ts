export interface CountryOptions {
  id: string;
  name: string
}

export class Country implements CountryOptions {
  id: string;
  name: string;
  constructor(options?: CountryOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        if (i == 'id') {
          this['id'] = options[i] ? options[i] : '';
        } else if (i == 'name') {
          this['name'] = options[i] ? options[i] : '';
        } else {
          this[i] = options[i] ? options[i] : '';
        }
      }
    }
  }
}
