const {getAllMembers, getMemberById, deleteMember} = require("../services/memberService");

const fetchMembers = async (request, response) => {
    try {

        const members = await getAllMembers();

        response.status(200).json(members);

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

const removeMember = async (request, response) => {
    try {

        const { id } = request.params;

        const member = await getMemberById(id);

        if (member === undefined) {
            return response.status(404).json({
                error: "Member not found"
            });
        }

        await deleteMember(id);

        response.status(200).json({message: "Member Deleted Successfully"});

    } catch (error) {
        response.status(500).json({error: "Internal Server Error"});
    }

};

module.exports = {
    fetchMembers,
    removeMember
};