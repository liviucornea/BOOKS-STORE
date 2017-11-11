package com.scotiabank.voice.bio.data;

/**
 * Created by LCornea on 4/24/2017.
 */
public class CidInputData extends BaseData {
    private String cid;
    private String acctNo;
    private String firstName;
    private String lastName;
    private String agentId;
    private String agentSite;
    private String agentExtension;

    public String getAcctNo() {
        return acctNo;
    }

    public void setAcctNo(String acctNbr) {
        this.acctNo = acctNbr;
    }

    public String getAgentSite() {
        return agentSite;
    }

    public void setAgentSite(String agentSite) {
        this.agentSite = agentSite;
    }

    public void setAgentExtension(String agentExtension) {
        this.agentExtension = agentExtension;
    }
    public String getAgentExtension() {
        return agentExtension;
    }

    public CidInputData() {
     }

    public String getCid() {
        return cid;
    }
    public void setCid(String cid) {
        this.cid = cid;
    }
    public String getFirstName() {
        return this.firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return this.lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getAgentId() {
        return agentId;
    }
    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Input Data{");
        sb.append("cid='").append(cid).append('\'');
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", agentId='").append(agentId).append('\'');
        sb.append('}');
        return sb.toString();
    }


}
