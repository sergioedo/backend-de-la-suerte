module.exports = {
    async findOne(ctx, next) {
        const filters = { gold: false }

        // check gold counter
        const findGoldCounter = (await strapi.entityService.findMany('api::find-gold-counter.find-gold-counter', { fields: ['gold_counter'] }))[0]

        const goldFound = (findGoldCounter.gold_counter <= 1)
        if (goldFound) { //gold found!!!
            filters.gold = true
        }

        // Update gold counter (if gold found, restart with random value, else decrease by 1)
        const entry = await strapi.entityService.update('api::find-gold-counter.find-gold-counter', findGoldCounter.id, {
            data: {
                gold_counter: goldFound ? Math.floor(Math.random() * 5) + 1 : findGoldCounter.gold_counter - 1
            },
        });

        const entities = await strapi.entityService.findMany('api::emoji.emoji', {
            fields: ['name', 'character', 'description'],
            filters,
        })

        const resultIndex = entities.length > 1 ? Math.floor(Math.random() * entities.length) : 0

        const { id, name, character, description } = entities[resultIndex]
        const emojiResult = {
            id,
            attributes: {
                name,
                character,
                description
            }
        }

        // Register on find-gold-log
        console.log('User Id', JSON.stringify(ctx.state.user))
        const entryLog = await strapi.entityService.create('api::find-gold-log.find-gold-log', {
            data: {
                emoji_character: emojiResult.attributes.character,
                is_gold: goldFound,
                user_id: ctx.state.user && ctx.state.user.id,
                username: ctx.state.user && ctx.state.user.username,
                user_email: ctx.state.user && ctx.state.user.email
            },
        });

        return { data: emojiResult, meta: {} }
    },
};