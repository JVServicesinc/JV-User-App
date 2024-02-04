import C from '../src/utils/helpers/constants'
const client = StreamChat.getInstance(C.GETSTREAM_API_KEY);

const channel = client.channel('messaging', {
    members: ['411', '407'],
});
await channel.create();
