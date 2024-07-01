export class StringUtils {
  static capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}

/** Manages all JSON and SQLITE data stroring (Needs refactoring maybe) */
