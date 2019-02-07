const ELB = 'http://rsi-memes.us-east-2.elasticbeanstalk.com';

export const API = {
    // PATH: 'localhost:5000/api',
    PATH: ELB + '/api',
    SIGNUP: '/sign-up',
    LOGIN: '/login',
};

export const STORAGE = {
    // PATH: 'localhost:5000/storage',
    PATH: ELB + '/storage',
    UPLOAD_MEME: '/images',
};
