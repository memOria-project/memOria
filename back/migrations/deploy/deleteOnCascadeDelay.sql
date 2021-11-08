-- Deploy memoria:deleteOnCascadeDelay to pg

BEGIN;

ALTER TABLE "delay"
    DROP CONSTRAINT delay_card_id_fkey;
	
ALTER TABLE "delay"
    DROP CONSTRAINT delay_user_id_fkey;
	
ALTER TABLE "delay"
    ADD CONSTRAINT delay_card_id_fkey FOREIGN KEY ("card_id") 
        REFERENCES "card"(id) ON DELETE CASCADE;
		
ALTER TABLE "delay"
    ADD CONSTRAINT delay_user_id_fkey FOREIGN KEY ("user_id")
        REFERENCES "user"(id) ON DELETE CASCADE;
        
COMMIT;
