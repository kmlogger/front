import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MeuPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f3e5f5',
            100: '#e1bee7',
            200: '#ce93d8',
            300: '#ba68c8',
            400: '#ab47bc',
            500: '#9c27b0',
            600: '#8e24aa',
            700: '#7b1fa2',
            800: '#6a1b9a',
            900: '#4a148c',
            950: '#38006b'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f3e5f5',
                    100: '#e1bee7',
                    200: '#ce93d8',
                    300: '#ba68c8',
                    400: '#ab47bc',
                    500: '#9c27b0',
                    600: '#8e24aa',
                    700: '#7b1fa2',
                    800: '#6a1b9a',
                    900: '#4a148c',
                    950: '#38006b'
                }
            },
            dark: {
                surface: {
                    0: '#000000',
                    50: '#1b1b1b',
                    100: '#363636',
                    200: '#515151',
                    300: '#6c6c6c',
                    400: '#878787',
                    500: '#a2a2a2',
                    600: '#bdbdbd',
                    700: '#d8d8d8',
                    800: '#f3f3f3',
                    900: '#ffffff',
                    950: '#ffffff'
                }
            }
        }
    }
});

export default MeuPreset;
