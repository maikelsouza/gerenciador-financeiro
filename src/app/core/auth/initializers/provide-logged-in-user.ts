import { provideAppInitializer } from "@angular/core";

export function provideLoggedInUser() {
  return provideAppInitializer(() => {    
    console.log("provideLoggedInUser");    
  });
}      