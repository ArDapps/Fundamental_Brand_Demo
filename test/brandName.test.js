const BrandName =  artifacts.require("./BrandName.sol"); //Get the File Brandname.sol

const {assert, should} = require("chai");

require("chai").use(require('chai-as-promised')).should();

contract ('BrandName',(accounts)=>{
    let contract;
    describe("Deploy the contract and explore the brand aname",async()=>{

        it("Deploy Successfull",async()=>{
            contract = await BrandName.deployed();
        })
        it("contract Has Address",async()=>{
            const address = contract.address;
            assert.notEqual(address,"");
            assert.notEqual(address,0x0);
            assert.notEqual(address,null);
            assert.notEqual(address,undefined);

            
        })

        it("Vaild Brand Name",async()=>{
            const name = await contract.name();
            assert.equal(name,"Ardapps.com","Your Correct brand name is Ardapps.com" );
        })
        
    })

})