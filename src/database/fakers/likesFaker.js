import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const generateFakeLikes = () => {
    return {    
        uuid: uuidv4(),
        videoUuid: faker.string.uuid(),
        userUuid: faker.string.uuid(),
    };
}