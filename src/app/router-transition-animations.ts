import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

//acá pongo las transiciones
export const routeTransitionAnimations = trigger('triggerName', [
    transition('Two => One', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
    ]),
    transition('One => Two', [
        // Set a default  style for enter and leave
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }),
        ]),
        // Animate the new page in
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ])
    ]),
]);